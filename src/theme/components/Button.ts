import { mode } from "@chakra-ui/theme-tools";
import { primaryDarkColor, primaryHoverDarkColor, primaryHoverLightColor, primaryLightColor } from "..";

const Button = {
	variants: {
		solid: (props: any) => ({
			fontFamily: "Oswald",
			bg: mode(primaryLightColor, primaryDarkColor)(props),
			color: "white",
			px: "2rem",
			textTransform: "uppercase",
			border: "4px solid transparent",
			fontWeight: "bold",
			_hover: {
				bg: "white",
				color: mode(primaryHoverLightColor, primaryHoverDarkColor)(props),
				border: "4px solid",
				borderColor: mode(primaryHoverLightColor, primaryHoverDarkColor)(props),
			},
			_focus: {
				boxShadow: "none",
			},
		}),
	},
};

export default Button;
