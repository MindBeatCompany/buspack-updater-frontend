import React, { useState } from "react";
import styles from "./NewProgressBar.module.css";

const NewProgressBar = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const steps = [1, 2, 3, 4, 5];

    const handlePrevClick = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
    };

    const handleNextClick = () => {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length));
    };

    return (
        <div className={styles.container}>
            <div className={styles.steps}>
                {steps.map((step) => (
                    <span
                        key={step}
                        className={`${styles.circle} ${
                            step === currentStep ? styles.active : ""
                        }`}
                    >
                        {step}
                    </span>
                ))}
                <div className={styles["progress-bar"]}>
                    <span
                        className={styles.indicator}
                        style={{
                            width: `${
                                (Math.max(currentStep - 1, 1) /
                                    (steps.length - 1)) *
                                100
                            }%`,
                        }}
                    />
                </div>
            </div>
            <div className={styles.buttons}>
                <button
                    id="prev"
                    className={styles.button}
                    onClick={handlePrevClick}
                    disabled={currentStep === 1}
                >
                    Prev
                </button>
                <button
                    id="next"
                    className={styles.button}
                    onClick={handleNextClick}
                    disabled={currentStep === steps.length}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default NewProgressBar;
