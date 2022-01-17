import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import Button from "./components/Button";
import Textarea from "./components/Textarea";

const config = {
	initialColorMode: "light",
	useSystemColorMode: false,
};

export const primaryLightColor = "teal.400";
export const primaryHoverLightColor = "teal.500";
export const primaryDarkColor = "teal.400";
export const primaryHoverDarkColor = "teal.500";

const theme = extendTheme({
	config,
	components: {
		Heading: {
			baseStyle: {
				fontFamily: "Oswald",
			},
		},
		Text: {
			baseStyle: {
				color: primaryLightColor,
			},
		},
		Modal: {
			baseStyle: {
				header: {
					fontFamily: "Oswald",
				},
			},
		},
		Button,
		Textarea,
	},
});

export default theme;
