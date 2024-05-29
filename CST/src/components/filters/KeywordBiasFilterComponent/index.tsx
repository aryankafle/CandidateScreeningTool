import { SetStateAction, useState } from "react";

import { useTheme } from "@mui/material";

import {
    Filter,
    FilterType,

    generateKeywordBiasFilter
} from "../../../utils/Filter";



import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

import { FilterTextInput } from "../FilterTextInput";





type KeywordBiasFilterProps = {

    selectedFilters: Filter[],
    setSelectedFilters: React.Dispatch<SetStateAction<Filter[]>>

}





export const KeywordBiasFilter = ({ selectedFilters, setSelectedFilters } : KeywordBiasFilterProps) => {

    const { palette } = useTheme()

    const [isStrict, setIsStrict] = useState(false)

    return (
        <Stack
            direction={"column"}
        >

            <Typography
                sx={{
                    fontSize: "1.4rem"
                }}
                color={palette.grey[900]}
                mb={"0.4vw"}
            >
                Below, input another keyword to bias.
            </Typography>

            <Typography
                sx={{
                    fontSize: "1.2rem",
                    whiteSpace: "wrap"
                }}
                color={palette.grey[800]}
            >
                Our AI will look for this word, and any words similar in contextual meaning.
            </Typography>

            <Typography
                sx={{
                    fontSize: "1.2rem",
                    whiteSpace: "wrap"
                }}
                color={palette.grey[800]}
                mb={"1vw"}
            >
                If you wish for this to be a strict search instead, check "strict".
            </Typography>

            <FilterTextInput
                onSubmit={(value) => {

                    if(selectedFilters.some(filter => [ `keyword-bias-${value}` as FilterType, `strict-keyword-bias-${value}` as FilterType ].includes(filter.type) ) ) return;

                    setSelectedFilters(prevFilters => [...prevFilters, generateKeywordBiasFilter(value, isStrict)])
                
                }}
            >
                Insert Keyword Bias:
            </FilterTextInput>

            <Stack
                direction={"row"}
            >

                <Switch
                    sx={{
                        alignSelf: "center"
                    }}
                    checked={isStrict}
                    onChange={(event, checked) => setIsStrict(checked)}
                    color='secondary'
                />
                
                    <Typography
                        sx={{
                            fontSize: "1rem",
                            alignSelf: "center"
                        }}
                    >
                        Strict?
                    </Typography>

            </Stack>


        </Stack>
    )

}