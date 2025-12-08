"use client";

import { Clock } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface WorkingHour {
  day: string;
  hours: number;
}

interface OverViewGraphProps {
  data: {
    averageWeeklyHours: number;
    data: WorkingHour[];
  };
}

const OverViewGraph = ({ data }: OverViewGraphProps) => {
  return (
    <div className="">
      {/* Working Hours Chart */}
      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>Daily Working Hours</CardTitle>
          <CardDescription>Digital Resolution Team</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{ hours: { label: "Hours", color: "#eee36e" } }}
          >
            <BarChart accessibilityLayer data={data.data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="hours" fill="var(--color-hours)" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex gap-2 text-sm font-medium">
          <Clock className="h-4 w-4" />
          Average weekly hours: {data.averageWeeklyHours}
        </CardFooter>
      </Card>
    </div>
  );
};

export default OverViewGraph;
