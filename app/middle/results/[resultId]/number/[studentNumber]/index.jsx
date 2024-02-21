"use client"
import {ViewResultStudent} from "../../../../../components/Results";
import JSConfetti from "js-confetti";
import {getGlobalResultStudent} from "../../../../../../helpers/Global";
import {useSelector} from "react-redux";

export default function StudentNumber({student}) {
    const exceptions = useSelector(state => state.exception.data)
    // const canvas = document.createElement("canvas")
    // canvas.position = "absolute"
    // canvas.right = 0
    // canvas.top = 0
    // canvas.left = 0
    // canvas.bottom = 0
    // canvas.width = window.innerWidth

    const jsConfetti = new JSConfetti()

    jsConfetti.addConfetti({
        confettiNumber: 500,
    }).then(() => {

    })
    return (
        <div>
            <ViewResultStudent student={getGlobalResultStudent({student, exceptions})} />
        </div>
    )
}