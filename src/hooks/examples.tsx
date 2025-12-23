import {useBasic} from "./useBasic.tsx";

const useExamples = () => {
    const basic = useBasic();
    return {
        basic,
    }
}
export {useExamples};