
// Mock patient data for the Doctor AI function
export const patients = [
  {
    id: "p1",
    firstName: "John",
    lastName: "Smith",
    dateOfBirth: "1980-05-15",
    mrn: "MRN12345",
    status: "stable",
    contactInfo: {
      phone: "(555) 123-4567",
      email: "john.smith@example.com",
      address: "123 Main St, Anytown, USA 12345"
    },
    vitalSigns: {
      temperature: 98.6,
      heartRate: 72,
      bloodPressure: "120/80",
      respiratoryRate: 16,
      oxygenSaturation: 98,
      recordedAt: "2023-06-01T10:30:00"
    },
    medications: [
      {
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        startDate: "2022-01-15",
        prescribedBy: "Dr. Johnson"
      },
      {
        name: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        startDate: "2021-11-20",
        prescribedBy: "Dr. Williams"
      }
    ],
    conditions: [
      {
        name: "Type 2 Diabetes",
        status: "active",
        diagnosedDate: "2021-10-05",
        severity: "moderate"
      },
      {
        name: "Hypertension",
        status: "active",
        diagnosedDate: "2022-01-10",
        severity: "mild"
      }
    ],
    allergies: ["Penicillin", "Peanuts"],
    labResults: [
      {
        name: "HbA1c",
        result: "7.2%",
        normalRange: "4.0-5.6%",
        date: "2023-05-15",
        status: "abnormal"
      },
      {
        name: "Blood Glucose",
        result: "142 mg/dL",
        normalRange: "70-99 mg/dL",
        date: "2023-05-15",
        status: "abnormal"
      },
      {
        name: "Cholesterol, Total",
        result: "195 mg/dL",
        normalRange: "<200 mg/dL",
        date: "2023-05-15",
        status: "normal"
      }
    ],
    visits: [
      {
        date: "2023-05-15",
        type: "regular checkup",
        provider: "Dr. Johnson",
        notes: "Patient reports feeling well. Blood pressure controlled. Advised on diet and exercise."
      },
      {
        date: "2023-02-10",
        type: "sick visit",
        provider: "Dr. Williams",
        notes: "Patient presented with flu-like symptoms. Prescribed rest and fluids. Symptoms resolved within a week."
      }
    ]
  },
  {
    id: "p2",
    firstName: "Emily",
    lastName: "Johnson",
    dateOfBirth: "1975-08-22",
    mrn: "MRN54321",
    status: "critical",
    contactInfo: {
      phone: "(555) 987-6543",
      email: "emily.johnson@example.com",
      address: "456 Oak Ave, Somewhere, USA 67890"
    },
    vitalSigns: {
      temperature: 101.3,
      heartRate: 112,
      bloodPressure: "145/95",
      respiratoryRate: 22,
      oxygenSaturation: 92,
      recordedAt: "2023-06-02T14:15:00"
    },
    medications: [
      {
        name: "Ceftriaxone",
        dosage: "1g",
        frequency: "Every 12 hours",
        startDate: "2023-06-01",
        prescribedBy: "Dr. Martinez"
      },
      {
        name: "Albuterol",
        dosage: "2 puffs",
        frequency: "Every 4-6 hours as needed",
        startDate: "2022-09-15",
        prescribedBy: "Dr. Chen"
      },
      {
        name: "Prednisone",
        dosage: "20mg",
        frequency: "Once daily",
        startDate: "2023-06-01",
        prescribedBy: "Dr. Martinez"
      }
    ],
    conditions: [
      {
        name: "Pneumonia",
        status: "active",
        diagnosedDate: "2023-06-01",
        severity: "severe"
      },
      {
        name: "Asthma",
        status: "active",
        diagnosedDate: "2022-09-10",
        severity: "moderate"
      }
    ],
    allergies: ["Sulfa drugs"],
    labResults: [
      {
        name: "White Blood Cell Count",
        result: "15,000/µL",
        normalRange: "4,500-11,000/µL",
        date: "2023-06-01",
        status: "abnormal"
      },
      {
        name: "C-Reactive Protein",
        result: "120 mg/L",
        normalRange: "<10 mg/L",
        date: "2023-06-01",
        status: "critical"
      },
      {
        name: "Oxygen Saturation",
        result: "92%",
        normalRange: "≥95%",
        date: "2023-06-02",
        status: "abnormal"
      }
    ],
    visits: [
      {
        date: "2023-06-01",
        type: "emergency",
        provider: "Dr. Martinez",
        notes: "Patient admitted with severe pneumonia. Started on IV antibiotics and steroids. Monitoring closely."
      },
      {
        date: "2023-03-05",
        type: "specialist consultation",
        provider: "Dr. Chen",
        notes: "Asthma follow-up. Current therapy maintaining control. Spirometry shows mild obstruction."
      }
    ]
  },
  {
    id: "p3",
    firstName: "Michael",
    lastName: "Williams",
    dateOfBirth: "1990-03-10",
    mrn: "MRN67890",
    status: "warning",
    contactInfo: {
      phone: "(555) 555-5555",
      email: "michael.williams@example.com",
      address: "789 Pine St, Elsewhere, USA 54321"
    },
    vitalSigns: {
      temperature: 99.1,
      heartRate: 88,
      bloodPressure: "130/85",
      respiratoryRate: 18,
      oxygenSaturation: 96,
      recordedAt: "2023-06-02T09:45:00"
    },
    medications: [
      {
        name: "Levothyroxine",
        dosage: "75mcg",
        frequency: "Once daily",
        startDate: "2020-05-12",
        prescribedBy: "Dr. Thompson"
      }
    ],
    conditions: [
      {
        name: "Hypothyroidism",
        status: "active",
        diagnosedDate: "2020-05-10",
        severity: "mild"
      },
      {
        name: "Gastroesophageal Reflux Disease",
        status: "active",
        diagnosedDate: "2021-07-22",
        severity: "moderate"
      }
    ],
    allergies: [],
    labResults: [
      {
        name: "TSH",
        result: "4.2 mIU/L",
        normalRange: "0.4-4.0 mIU/L",
        date: "2023-05-20",
        status: "abnormal"
      },
      {
        name: "Free T4",
        result: "0.9 ng/dL",
        normalRange: "0.8-1.8 ng/dL",
        date: "2023-05-20",
        status: "normal"
      },
      {
        name: "Hemoglobin",
        result: "13.5 g/dL",
        normalRange: "13.5-17.5 g/dL",
        date: "2023-05-20",
        status: "normal"
      }
    ],
    visits: [
      {
        date: "2023-05-20",
        type: "regular checkup",
        provider: "Dr. Thompson",
        notes: "TSH slightly elevated. Consider increasing levothyroxine dosage at next visit if trend continues."
      },
      {
        date: "2023-01-15",
        type: "sick visit",
        provider: "Dr. Garcia",
        notes: "Presented with acid reflux symptoms. Advised on dietary changes and prescribed omeprazole for 2 weeks."
      }
    ]
  }
];
