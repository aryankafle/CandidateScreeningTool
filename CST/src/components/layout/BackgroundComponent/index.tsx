import { useTheme } from "@mui/material"
import Box from "@mui/material/Box"

const BackgroundComponent = () => {

    const { palette } = useTheme()

    return (
        <Box
            sx={{
                background: palette.primary.dark,
                position: "absolute",
                zIndex: "-1",
                width: "100vw",
                height: "33.3333vh",
                minHeight: "rem"
            }}
        />
    )

}

export default BackgroundComponent