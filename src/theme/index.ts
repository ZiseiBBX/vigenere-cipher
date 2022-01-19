import { extendTheme } from "@chakra-ui/react";
import Button from "./components/Button";
import Heading from "./components/Heading";
import Select from "./components/Select";
import Textarea from "./components/Textarea";
import Text from "./components/Text";
import Switch from "./components/Switch";
import Modal from "./components/Modal";
import Divider from "./components/Divider";

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
		Select,
		Heading,
		Text,
		Modal,
		Switch,
		Divider,
		Button,
		Textarea,
	},
});

export default theme;
