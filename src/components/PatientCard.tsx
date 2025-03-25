
import React from 'react';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import type { Patient } from '@/utils/mockData';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSlideIn } from '@/utils/animations';

interface PatientCardProps {
  patient: Patient;
  onClick?: () => void;
  delay?: number;
}

export const PatientCard: React.FC<PatientCardProps> = ({ 
  patient, 
  onClick,
  delay = 0
}) => {
  const slideInStyle = useSlideIn(delay, 300, 'up');
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-medical-critical';
      case 'warning': return 'bg-medical-warning';
      default: return 'bg-medical-success';
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  return (
    <Card 
      className="overflow-hidden hover:shadow-card cursor-pointer transition-all hover:scale-[1.02] duration-300"
      onClick={onClick}
      style={slideInStyle}
    >
      <div className={`h-1 ${getStatusColor(patient.status)}`} />
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-border">
              <AvatarFallback className="bg-medical-lightBlue text-medical-blue font-medium">
                {getInitials(patient.firstName, patient.lastName)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="font-medium text-lg leading-none">
                {patient.firstName} {patient.lastName}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>MRN: {patient.mrn}</span>
                <span>•</span>
                <span>{patient.gender}</span>
              </div>
            </div>
          </div>
          {patient.status === 'critical' && (
            <Badge variant="destructive" className="gap-1 pl-2 pr-3 rounded-full">
              <AlertCircle className="h-3 w-3" />
              Critical
            </Badge>
          )}
          {patient.status === 'warning' && (
            <Badge variant="outline" className="bg-medical-warning/10 text-medical-warning border-medical-warning gap-1 pl-2 pr-3 rounded-full">
              <AlertCircle className="h-3 w-3" />
              Warning
            </Badge>
          )}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1 text-xs">
            <Calendar className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">DOB:</span>
            <span>{patient.dateOfBirth}</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">Last visit:</span>
            <span>{patient.lastVisit}</span>
          </div>
        </div>

        <div className="mt-3">
          <div className="text-xs font-medium text-muted-foreground mb-1">Conditions</div>
          <div className="flex flex-wrap gap-1">
            {patient.conditions.map((condition, i) => (
              <Badge key={i} variant="secondary" className="rounded-full text-xs">
                {condition.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
