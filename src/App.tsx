import {
	Button,
	useBoolean,
	Flex,
	Heading,
	Text,
	VStack,
	HStack,
	Textarea,
	Box,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Center,
} from "@chakra-ui/react";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { SettingsIcon } from "@chakra-ui/icons";
import "./App.css";
import { primaryLightColor } from "./theme";

const sCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letterToIndex: { [key: string]: number } = [...sCharacters].reduce((a, v, i) => ({ ...a, [v]: i }), {});
let characters = [...sCharacters];

function rotateArray(arr: string[]) {
	let val = arr.shift();
	arr.push(val as string);
	return arr;
}

function generateMatrix() {
	let matrix: string[][] = [];
	for (let i = 0; i < sCharacters.length; i++) {
		matrix.push([...characters]);
		characters = rotateArray(characters);
	}
	return matrix;
}

function App() {
	const [matrix, setMatrix] = useState<string[][]>([]);

	const [data, setData] = useState({
		plainText: "",
		key: "",
		keyStream: "",
		cipherText: "",
	});

	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setData({ ...data, [event.target.name]: event.target.value.toUpperCase() });
	};

	const encrypt = () => {
		let keyStream = "";
		let cipherText = "";

		if (data.plainText.length > data.key.length) {
			let diff = data.plainText.length - data.key.length;
			let repeatFactor = Math.ceil(data.plainText.length / diff);
			keyStream = data.key.repeat(repeatFactor + 1).slice(0, data.plainText.length);
		} else if (data.plainText.length === data.key.length) {
			keyStream = data.key;
		} else {
			keyStream = data.key.slice(0, data.plainText.length);
		}

		setData({ ...data, keyStream: keyStream });

		for (let i = 0; i < data.plainText.length; i++) {
			let row = letterToIndex[data.plainText[i]];
			let col = letterToIndex[keyStream[i]];
			cipherText += matrix[row][col];
		}
		setData({ ...data, cipherText });

		console.log(data, keyStream);
	};

	useEffect(() => {
		setMatrix(generateMatrix());
	}, []);

	return (
		<Flex height="100vh" width="100%" direction="column">
			<Box ml="auto" mt="2" mr="2" onClick={onOpen} cursor="pointer">
				<SettingsIcon w={[6, 6, 8]} h={[6, 6, 8]} color={primaryLightColor} />
			</Box>
			<Flex justify="center" align="center" w="100%" flex="1" textAlign="center" px={[2, 0]}>
				<VStack spacing="1rem">
					<Heading fontSize={["2.5rem", "3rem", "4rem"]} color="teal.500" userSelect="none">
						VIGENERE CIPHER
					</Heading>
					<HStack spacing="2rem" justify="center">
						<Textarea
							value={data.plainText}
							name="plainText"
							placeholder="Plain Text"
							resize="none"
							onChange={handleInputChange}
							w={["40%", "auto"]}
						/>
						<Textarea
							value={data.key}
							name="key"
							placeholder="Key"
							resize="none"
							onChange={handleInputChange}
							w={["40%", "auto"]}
						/>
					</HStack>
					{data.cipherText !== "" && (
						<VStack spacing="1px">
							<Text fontSize={["1.2rem", "1.5rem", "1.7rem"]} fontFamily="Oswald">
								Encrypted Text
							</Text>
							<Text fontWeight="bold" fontSize="1.5rem">
								{data.cipherText}
							</Text>
						</VStack>
					)}
					<Button onClick={encrypt}>Encrypt</Button>
				</VStack>
			</Flex>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Settings</ModalHeader>
					<ModalCloseButton />
					<ModalBody>Yolo</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Flex>
	);
}

export default App;
