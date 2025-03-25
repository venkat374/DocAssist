
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { patients } from "./mockData.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question, patientId } = await req.json();
    
    console.log("Request received:", { question, patientId });
    
    if (!question) {
      return new Response(
        JSON.stringify({ error: "Question is required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Find the specific patient if patientId is provided
    let relevantPatient = null;
    if (patientId) {
      relevantPatient = patients.find(patient => patient.id === patientId);
      if (!relevantPatient) {
        console.log("Patient not found:", patientId);
        return new Response(
          JSON.stringify({ error: "Patient not found" }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      console.log("Found patient:", relevantPatient.firstName, relevantPatient.lastName);
    }

    // Process different types of questions
    let answer = "I don't have enough information to answer that question.";
    const questionLower = question.toLowerCase();

    // If we have a specific patient
    if (relevantPatient) {
      if (questionLower.includes("blood pressure") || questionLower.includes("bp")) {
        answer = processBloodPressureQuestion(relevantPatient);
      } else if (questionLower.includes("heart rate") || questionLower.includes("pulse")) {
        answer = processHeartRateQuestion(relevantPatient);
      } else if (questionLower.includes("temperature") || questionLower.includes("temp")) {
        answer = processTemperatureQuestion(relevantPatient);
      } else if (questionLower.includes("medication") || questionLower.includes("medicine") || questionLower.includes("drug")) {
        answer = processMedicationQuestion(relevantPatient);
      } else if (questionLower.includes("condition") || questionLower.includes("diagnosis")) {
        answer = processConditionQuestion(relevantPatient);
      } else if (questionLower.includes("lab") || questionLower.includes("test result")) {
        answer = processLabResultQuestion(relevantPatient);
      } else if (questionLower.includes("allergy") || questionLower.includes("allergic")) {
        answer = processAllergyQuestion(relevantPatient);
      } else if (questionLower.includes("visit") || questionLower.includes("appointment")) {
        answer = processVisitQuestion(relevantPatient);
      } else {
        answer = `I'm not sure how to answer that question about ${relevantPatient.firstName} ${relevantPatient.lastName}. You can ask about blood pressure, heart rate, temperature, medications, conditions, lab results, allergies, or past visits.`;
      }
    } else {
      // General questions about all patients
      if (questionLower.includes("critical patient") || questionLower.includes("critical condition")) {
        answer = processCriticalPatientsQuestion();
      } else if (questionLower.includes("diabetes")) {
        answer = processDiabetesQuestion();
      } else {
        answer = "Please select a specific patient to get detailed information, or ask about general statistics like 'How many critical patients do we have?' or 'Which patients have diabetes?'";
      }
    }

    console.log("Sending answer:", answer);
    
    return new Response(
      JSON.stringify({ answer }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error processing question:", error);
    
    return new Response(
      JSON.stringify({ error: "Failed to process question", details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Helper functions to process different types of questions
function processBloodPressureQuestion(patient) {
  if (patient.vitalSigns?.bloodPressure) {
    const recordedDate = new Date(patient.vitalSigns.recordedAt).toLocaleDateString();
    return `${patient.firstName} ${patient.lastName}'s most recent blood pressure was ${patient.vitalSigns.bloodPressure}, recorded on ${recordedDate}.`;
  }
  return `I don't have blood pressure information for ${patient.firstName} ${patient.lastName}.`;
}

function processHeartRateQuestion(patient) {
  if (patient.vitalSigns?.heartRate) {
    const recordedDate = new Date(patient.vitalSigns.recordedAt).toLocaleDateString();
    return `${patient.firstName} ${patient.lastName}'s most recent heart rate was ${patient.vitalSigns.heartRate} bpm, recorded on ${recordedDate}.`;
  }
  return `I don't have heart rate information for ${patient.firstName} ${patient.lastName}.`;
}

function processTemperatureQuestion(patient) {
  if (patient.vitalSigns?.temperature) {
    const recordedDate = new Date(patient.vitalSigns.recordedAt).toLocaleDateString();
    return `${patient.firstName} ${patient.lastName}'s most recent temperature was ${patient.vitalSigns.temperature}°F, recorded on ${recordedDate}.`;
  }
  return `I don't have temperature information for ${patient.firstName} ${patient.lastName}.`;
}

function processMedicationQuestion(patient) {
  if (patient.medications?.length > 0) {
    const medicationsList = patient.medications.map(med => 
      `${med.name} ${med.dosage} ${med.frequency}`
    ).join(", ");
    return `${patient.firstName} ${patient.lastName} is currently taking: ${medicationsList}.`;
  }
  return `${patient.firstName} ${patient.lastName} is not currently taking any medications.`;
}

function processConditionQuestion(patient) {
  if (patient.conditions?.length > 0) {
    const activeConditions = patient.conditions.filter(c => c.status === 'active');
    if (activeConditions.length > 0) {
      const conditionsList = activeConditions.map(c => 
        `${c.name} (${c.severity} severity, diagnosed on ${new Date(c.diagnosedDate).toLocaleDateString()})`
      ).join(", ");
      return `${patient.firstName} ${patient.lastName}'s active medical conditions are: ${conditionsList}.`;
    }
    return `${patient.firstName} ${patient.lastName} has no active medical conditions.`;
  }
  return `I don't have information about ${patient.firstName} ${patient.lastName}'s medical conditions.`;
}

function processLabResultQuestion(patient) {
  if (patient.labResults?.length > 0) {
    // Sort by date, most recent first
    const sortedResults = [...patient.labResults].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    const recentResults = sortedResults.slice(0, 3);
    const resultsList = recentResults.map(result => 
      `${result.name}: ${result.result} (${result.status}, ${new Date(result.date).toLocaleDateString()})`
    ).join("; ");
    
    return `${patient.firstName} ${patient.lastName}'s most recent lab results are: ${resultsList}.`;
  }
  return `I don't have lab result information for ${patient.firstName} ${patient.lastName}.`;
}

function processAllergyQuestion(patient) {
  if (patient.allergies?.length > 0) {
    const allergiesList = patient.allergies.join(", ");
    return `${patient.firstName} ${patient.lastName} has the following allergies: ${allergiesList}.`;
  }
  return `${patient.firstName} ${patient.lastName} has no known allergies.`;
}

function processVisitQuestion(patient) {
  if (patient.visits?.length > 0) {
    // Sort by date, most recent first
    const sortedVisits = [...patient.visits].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    const mostRecent = sortedVisits[0];
    return `${patient.firstName} ${patient.lastName}'s most recent visit was on ${new Date(mostRecent.date).toLocaleDateString()} for a ${mostRecent.type} appointment with ${mostRecent.provider}. Notes: ${mostRecent.notes}`;
  }
  return `I don't have visit history for ${patient.firstName} ${patient.lastName}.`;
}

function processCriticalPatientsQuestion() {
  const criticalPatients = patients.filter(p => p.status === 'critical');
  if (criticalPatients.length > 0) {
    const patientList = criticalPatients.map(p => `${p.firstName} ${p.lastName}`).join(", ");
    return `There are ${criticalPatients.length} patients in critical condition: ${patientList}.`;
  }
  return "There are no patients in critical condition at this time.";
}

function processDiabetesQuestion() {
  const diabetesPatients = patients.filter(p => 
    p.conditions?.some(c => 
      c.name.toLowerCase().includes('diabetes') && c.status === 'active'
    )
  );
  
  if (diabetesPatients.length > 0) {
    const patientList = diabetesPatients.map(p => {
      const diabetesCondition = p.conditions.find(c => 
        c.name.toLowerCase().includes('diabetes') && c.status === 'active'
      );
      return `${p.firstName} ${p.lastName} (${diabetesCondition.name})`;
    }).join(", ");
    
    return `There are ${diabetesPatients.length} patients with diabetes: ${patientList}.`;
  }
  return "There are no patients with diabetes at this time.";
}
