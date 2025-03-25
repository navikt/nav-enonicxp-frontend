import React from 'react';
import { SelectableStep } from 'types/content-props/form-intermediate-step';
import style from './StepVisualization.module.scss';

export type TreeNode = {
    label: string;
    children?: TreeNode[];
};

type Props = {
    steps: SelectableStep[];
};

const buildStepTree = (steps: SelectableStep[]): TreeNode[] => {
    return steps.map((step) => {
        const node: TreeNode = { label: step.label };
        if (step.nextStep?._selected === 'next' && step.nextStep.next?.steps) {
            node.children = buildStepTree(step.nextStep.next.steps);
        }
        return node;
    });
};

const TreeItem = ({ node }: { node: TreeNode }) => (
    <li>
        <span>{node.label}</span>
        {node.children && node.children.length > 0 && (
            <ul>
                {node.children.map((child, index) => (
                    <TreeItem key={index} node={child} />
                ))}
            </ul>
        )}
    </li>
);

export const StepVisualization = ({ steps }: Props) => {
    const treeData = buildStepTree(steps);

    return (
        <ul className={style.tree}>
            {treeData.map((step, index) => (
                <TreeItem key={index} node={step} />
            ))}
        </ul>
    );
};
