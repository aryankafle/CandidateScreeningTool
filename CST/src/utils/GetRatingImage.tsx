import AGrade from "../../assets/a-rating.png"
import BGrade from "../../assets/b-rating.png"
import CGrade from "../../assets/c-rating.png"
import DGrade from "../../assets/d-rating.png"
import FGrade from "../../assets/f-rating.png"

import { LetterGrade } from "./Result";





export const getRatingImage = (grade : LetterGrade) => {
    switch(grade) {
        case LetterGrade.A:
            return <img alt="'A' Rating" src={AGrade}
                        className="self-center w-[4rem] h-[4rem]"
            />;
        case LetterGrade.B:
            return <img alt="'B' Rating" src={BGrade}
                        className="self-center w-[4rem] h-[4rem]"
            />;
        case LetterGrade.C:
            return <img alt="'C' Rating" src={CGrade}
                        className="self-center w-[4rem] h-[4rem]"
            />;
        case LetterGrade.D:
            return <img alt="'D' Rating" src={DGrade}
                        className="self-center w-[4rem] h-[4rem]"
            />;
        case LetterGrade.F:
            return <img alt="'F' Rating" src={FGrade}
                        className="self-center w-[4rem] h-[4rem]"
            />;
        default:
            throw new Error(`Grade: ${grade} is out of range!`)
    }
}