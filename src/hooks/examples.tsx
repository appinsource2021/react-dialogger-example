import {useBasic} from "./useBasic.tsx";
import {useUpdateValues} from "./useUpdateValues.tsx";
import {useWithSlot} from "./useWithSlot.tsx";
import {useWithListeners} from "./useWithListeners.tsx";
import {useWithUseEffect} from "./useWithUseEffect.tsx";

const useExamples = () => {

    const basic = useBasic();
    const updateValues = useUpdateValues();
    const withSlot = useWithSlot();
    const withListener = useWithListeners();
    const withUseEffect = useWithUseEffect();

    return {
        basic,
        updateValues,
        withSlot,
        withListener,
        withUseEffect
    }

}
export {useExamples};