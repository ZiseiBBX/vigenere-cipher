import { mode } from "@chakra-ui/theme-tools";
import { primaryHoverLightColor, primaryHoverDarkColor, primaryLightColor, primaryDarkColor } from "..";

const Select = {
	variants: {
		outline: (props: any) => ({
			color: mode(primaryHoverLightColor, primaryHoverDarkColor)(props),
			fontWeight: "500",
			borderColor: mode(primaryLightColor, primaryDarkColor)(props),
			_focus: {
				borderColor: mode(primaryLightColor, primaryDarkColor)(props),
			},
			_hover: {
				borderColor: mode(primaryHoverLightColor, primaryHoverDarkColor)(props),
			},
		}),
	},
};

export default Select;
