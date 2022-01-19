import { BoxProps, Box, Text, TextProps, FlexProps, Flex, HeadingProps, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";

export const MotionBox = motion<BoxProps>(Box);
export const MotionText = motion<TextProps>(Text);
export const MotionFlex = motion<FlexProps>(Flex);
export const MotionHeading = motion<HeadingProps>(Heading);
