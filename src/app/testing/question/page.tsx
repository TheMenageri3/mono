import React from "react";
import { CreateQuestion } from "./components/CreateQuestion";
import { ListQuestion } from "./components/ListQuestion";

export default function QuestionPage() {
    return (
        <div>
            <CreateQuestion />
            <ListQuestion />
        </div>
    );
}
