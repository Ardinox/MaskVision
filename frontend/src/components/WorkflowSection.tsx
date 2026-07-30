import { workflow } from "@/lib/workflow";
import React from "react";
import { ArrowRight } from "lucide-react";

const WorkflowSection = () => {
  const card =
    "w-44 h-44 flex flex-col items-center justify-center rounded-2xl border bg-white dark:bg-zinc-900 p-5 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl";
  return (
    <>
      <div>
        <h2 className="text-2xl md:text-3xl font-bold">How it Works</h2>
        <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
          MaskVision processes every image and video through an AI-assisted
          pipeline to detect and hide sensitive information while preserving the
          rest of the document.
        </p>
        <div className="mt-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          {workflow.map(({ title, description, icon: Icon }, index) => (
            <React.Fragment key={title}>
              <div className={card}>
                <Icon className="mb-3 h-8 w-8 text-blue-600 dark:text-blue-400" />

                <h3 className="font-semibold">{title}</h3>

                <p className="mt-2 h-10 text-sm text-zinc-500 dark:text-zinc-400">
                  {description}
                </p>
              </div>

              {index < workflow.length - 1 && (
                <ArrowRight className="hidden lg:block shrink-0 text-zinc-400" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default WorkflowSection;
