import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <Card className="bg-[#f0f4ff] border-[#183473]">
      <CardHeader>
        <Icon className="h-6 w-6 mb-2 text-[#183473]" />
        <CardTitle className="text-[#183473]">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-[#183473]">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;