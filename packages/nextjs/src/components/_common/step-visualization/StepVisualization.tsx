import React from 'react';
import style from './StepVisualization.module.scss';

export type TreeNode = {
    label: string;
    children?: TreeNode[];
};

type Props = {
    steps: TreeNode[];
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
    return (
        <ul className={style.tree}>
            {steps.map((step, index) => (
                <TreeItem key={index} node={step} />
            ))}
        </ul>
    );
};
