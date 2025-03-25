import React from 'react';
import style from './StepVisualization.module.scss';

type Props = {
    currentStep: number;
    totalSteps: number;
    steps: Array<{
        label: string;
        level: number;
    }>;
};

export const StepVisualization = ({ steps }: Props) => {
    return (
        <ul className={style.tree}>
            {steps.map((step, index) => (
                <li key={index} style={{ paddingLeft: `${step.level * 20}px` }}>
                    {step.label}
                </li>
            ))}
        </ul>
    );
};
