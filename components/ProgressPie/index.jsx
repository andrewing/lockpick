import React from "react";
const ProgressPie = ({ progress }) => {
    const strokeWidth = 8; // Customize the stroke width
    const radius = 50; // Customize the radius
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <svg className="circular-progress" width={2 * radius} height={2 * radius}>
            <circle
                style={{
                    stroke: "grey",
                }}
                cx={radius}
                cy={radius}
                r={radius - strokeWidth / 2}
                strokeWidth={strokeWidth}
            />
            <circle
                style={{
                    stroke: "#cbb892",
                    strokeLinecap: "square",
                }}
                cx={radius}
                cy={radius}
                r={radius - strokeWidth / 2}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
            />
            <text
                className="circular-progress-text"
                x={radius}
                y={radius}
                style={{
                    fill: "#fff",
                    dominantBaseline: "middle",
                    textAnchor: "middle",
                }}
            >
                {progress}%
            </text>
        </svg>
    );
}

export default ProgressPie;