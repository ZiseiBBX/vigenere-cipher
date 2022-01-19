import {
	Button,
	Flex,
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
	Select,
	useToast,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ArrowDownIcon, SettingsIcon } from "@chakra-ui/icons";
import { primaryLightColor } from "./theme";
import Settings from "./components/Settings";
import { performVigenereEncrypt } from "./utils/vigenereFunctions/encryption";
import { performVigenereDecrypt } from "./utils/vigenereFunctions/decryption";
import { AnimatePresence, motion } from "framer-motion";
import { Characters } from "./utils/constants";
import { MotionHeading, MotionFlex, MotionText } from "./utils/motionComponents";

type Mode = "encrypt" | "decrypt";
type Data = {
	plainText: string;
	key: string;
	cipherText: string;
	keyStream: string;
	result: string;
	matrix: string[][];
};

function App() {
	const [data, setData] = useState<Data>({
		plainText: "",
		key: "",
		cipherText: "",
		keyStream: "",
		result: "",
		matrix: [],
	});

	const [title, setTitle] = useState("VIGENERE CIPHER");

	const [mode, setMode] = useState<Mode>("encrypt");

	const encryptRef = useRef<HTMLTextAreaElement>(null);
	const decryptRef = useRef<HTMLTextAreaElement>(null);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();

	const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setData({ ...data, [event.target.name]: event.target.value.toUpperCase() });
	};

	const performEncryption = () => {
		try {
			const res = performVigenereEncrypt(data.plainText, data.key);
			setData({ ...data, result: res?.cipherText, keyStream: res?.keyStream, matrix: res.matrix });
		} catch (err) {
			toast({ title: "Error", description: err as string, position: "top", status: "error" });
		}
	};

	const performDecryption = () => {
		try {
			const res = performVigenereDecrypt(data.cipherText, data.key);
			setData({ ...data, result: res?.plainText, keyStream: res?.keyStream });
		} catch (err) {
			toast({ title: "Error", description: err as string, position: "top", status: "error" });
		}
	};

	useEffect(() => {
		let characters = Characters.ALPHA;
		let index = 0;

		let interval = window.setInterval(() => {
			if (index + 1 === characters.length) index = 0;
			let letter = characters[index];
			const res = performVigenereEncrypt("VIGENERE CIPHER", letter);
			index += 1;
			setTitle("");
			window.setTimeout(() => {
				setTitle(res.cipherText);
			}, 1000);
			//setTitle(res.cipherText);
		}, 6000);

		return () => clearInterval(interval);
	}, []);

	return (
		<Flex height="100vh" width="100%" direction="column">
			<Box ml="auto" mt="2" mr="2" onClick={onOpen} cursor="pointer">
				<SettingsIcon w={[6, 6, 8]} h={[6, 6, 8]} color={primaryLightColor} />
			</Box>
			<Flex justify="center" align="center" w="100%" flex="1" textAlign="center" px={[2, 0]}>
				<VStack spacing="1rem">
					<Box height="80px">
						<AnimatePresence exitBeforeEnter={true}>
							{title !== "" && (
								<MotionHeading
									key="title"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1, transition: { duration: 1 } }}
									exit={{ opacity: 0.05, transition: { duration: 1 } }}
									fontSize={["2.5rem", "3rem", "4rem"]}
									color="teal.500"
									userSelect="none"
								>
									{title}
								</MotionHeading>
							)}
						</AnimatePresence>
					</Box>
					<HStack spacing="2rem" justify="center">
						{mode === "encrypt" && (
							<Textarea
								ref={encryptRef}
								value={data.plainText}
								name="plainText"
								placeholder="Plain Text"
								resize="none"
								onChange={handleInputChange}
								w={["40%", "auto"]}
							/>
						)}
						{mode === "decrypt" && (
							<Textarea
								ref={decryptRef}
								value={data.cipherText}
								name="cipherText"
								placeholder="Cipher Text"
								resize="none"
								onChange={handleInputChange}
								w={["40%", "auto"]}
							/>
						)}
						<Textarea
							value={data.key}
							name="key"
							placeholder="Key"
							resize="none"
							onChange={handleInputChange}
							w={["40%", "auto"]}
						/>
					</HStack>
					{data.result !== "" && mode === "encrypt" && (
						<VStack spacing="1px">
							<Text fontSize={["1.2rem", "1.5rem", "1.7rem"]} fontFamily="Oswald">
								Encrypted Text
							</Text>
							<Text fontWeight="bold" fontSize="1.5rem">
								{data.result}
							</Text>
						</VStack>
					)}
					{data.result !== "" && mode === "decrypt" && (
						<VStack spacing="1px">
							<Text fontSize={["1.2rem", "1.5rem", "1.7rem"]} fontFamily="Oswald">
								Decrypted Text
							</Text>
							<Text fontWeight="bold" fontSize="1.5rem">
								{data.result}
							</Text>
						</VStack>
					)}
					<HStack>
						<Select
							value={mode}
							onChange={(e) => {
								setMode(e.target.value as Mode);
								setData({ ...data, plainText: "", cipherText: "", result: "" });
								if ((e.target.value as Mode) === "encrypt") encryptRef.current?.focus();
								else decryptRef.current?.focus();
							}}
						>
							<option value="encrypt">Encrypt</option>
							<option value="decrypt">Decrypt</option>
						</Select>
						<Button
							onClick={() => {
								setData({ ...data, result: "" });
								if (mode === "encrypt") performEncryption();
								else performDecryption();
							}}
						>
							GO!
						</Button>
					</HStack>
					{mode === "encrypt" && (
						<MotionFlex whileHover={{ scale: 1.1 }}>
							{[...data.plainText].map((letter, index) => (
								<MotionText
									key={`${letter}${index}`}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1, transition: { staggerChildren: 0.5 } }}
									mx="2"
									fontWeight="bold"
									fontSize="1.5rem"
								>
									{letter}
								</MotionText>
							))}
						</MotionFlex>
					)}
					{mode === "decrypt" && (
						<MotionFlex whileHover={{ scale: 1.1 }}>
							{[...data.cipherText].map((letter, index) => (
								<MotionText
									key={`${letter}${index}`}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1, transition: { staggerChildren: 0.5 } }}
									mx="2"
									fontWeight="bold"
									fontSize="1.5rem"
								>
									{letter}
								</MotionText>
							))}
						</MotionFlex>
					)}
					{data.result && (
						<MotionFlex whileHover={{ scale: 1.1 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
							<ArrowDownIcon color="red.500" fontSize="1.5rem" />
						</MotionFlex>
					)}
					<MotionFlex whileHover={{ scale: 1.1 }}>
						{[...data.result].map((letter, index) => (
							<MotionText
								key={`${letter}${index}`}
								mx="2"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1, transition: { staggerChildren: 0.5, duration: 1, delay: index * 0.125 } }}
								fontWeight="bold"
								fontSize="1.5rem"
							>
								{letter}
							</MotionText>
						))}
					</MotionFlex>
				</VStack>
			</Flex>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Settings</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Settings />
					</ModalBody>
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
