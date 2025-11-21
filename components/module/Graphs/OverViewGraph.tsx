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
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const workingHourData = [
  { day: "Monday", hours: 2 },
  { day: "Tuesday", hours: 8 },
  { day: "Wednesday", hours: 4 },
  { day: "Thursday", hours: 8 },
  { day: "Friday", hours: 7.5 },
  { day: "Saturday", hours: 4 },
  { day: "Sunday", hours: 0 },
];

const OverViewGraph = () => {
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
            config={{ hours: { label: "Hours", color: "var(--destructive)" } }}
          >
            <BarChart accessibilityLayer data={workingHourData}>
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
          Average weekly hours: 43
        </CardFooter>
      </Card>
    </div>
  );
};

export default OverViewGraph;
