import { useEffect, useState } from 'react';
import PropTypes from "prop-types";

export default function MCQ({ keyy }) {

    return (
        <div id={keyy} className="quiz-mcq-wrapper">
            <p> I am a MCQ </p>
        </div>
    );
}

MCQ.propTypes = {
    keyy: PropTypes.number.isRequired,
};