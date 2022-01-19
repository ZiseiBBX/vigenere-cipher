import { Box, HStack, Divider, Switch, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Characters } from "../utils/constants";

function Settings() {
	const [numbers, setNumbers] = useState<boolean>(() => {
		if (localStorage.numberSwitch) {
			return localStorage.numberSwitch === "true" ? true : false;
		} else {
			localStorage.setItem("numberSwitch", "false");
			return false;
		}
	});

	useEffect(() => {
		if (numbers) {
			localStorage.setItem("characters", Characters.ALPHANUMERIC);
		} else {
			localStorage.setItem("characters", Characters.ALPHA);
		}
	}, [numbers]);

	return (
		<Box>
			<HStack justify="space-between" align="center">
				<Text fontWeight="semibold" fontSize="1.2rem" fontFamily="Oswald">
					Code Matrix
				</Text>
			</HStack>
			<Divider />
			<HStack mt="2" align="center" justify="space-between" px="4">
				<Text color="black">Include numbers</Text>
				<Switch
					isChecked={numbers}
					onChange={(e) => {
						setNumbers(e.target.checked);
						localStorage.setItem("numberSwitch", e.target.checked ? "true" : "false");
					}}
				/>
			</HStack>
			<Box mt="2" px="1">
				<Text fontWeight="bold" fontFamily="Oswald">
					Note
				</Text>
				<Text px="1" color="black" fontSize="0.8rem">
					Encryption has to be performed again to reflect the settings changes
				</Text>
			</Box>
		</Box>
	);
}

export default Settings;
