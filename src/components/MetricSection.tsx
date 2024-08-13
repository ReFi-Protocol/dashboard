import { FC } from "react";
import Widget from "../components/widget";
import { WidgetData } from "../types";

interface MetricsSectionProps {
  metricsWidgets: WidgetData[];
  title: string;
}

const MetricsSection: FC<MetricsSectionProps> = ({ metricsWidgets, title }) => (
  <div>
    <h3 className="mb-4 font-sans text-xl font-semibold text-white">{title}</h3>
    <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 3xl:grid-cols-4">
      {metricsWidgets.map((widget, index) => (
        <Widget
          key={index}
          icon={widget.icon}
          title={widget.title}
          subtitle={widget.subtitle}
        />
      ))}
    </div>
  </div>
);

export default MetricsSection;
