'use client';

import {
    Box,
    Button,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    Textarea,
    UnorderedList,
    ListItem,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createService } from "../../actions";

interface Props {
    token: string | null;
    filteredModalServices: string[];
    modalFilter: string;
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    setModalFilter: (value: string) => void;
}

interface ModalValues {
    name: string;
    description: string;
    selectedServices: string[];
}

export const ServiceModal = ({ token, filteredModalServices, modalFilter, isModalOpen, setIsModalOpen, setModalFilter }: Props) => {

    const validationSchema = Yup.object({
        name: Yup.string()
            .trim()
            .required("Name is required."),
        description: Yup.string()
            .trim()
            .required("Description is required."),
        selectedServices: Yup.array()
            .min(1, "At least one service must be selected."),
    });

    const onSubmit = async (body: ModalValues) => {
        console.log(body);

        if (!token) return

        try {
            await createService(body, token);
        } catch (e) {
            console.log('Failed to create service', e);
        }

        setIsModalOpen(false);
        setModalFilter('')
    };

    return (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <ModalOverlay />
            <ModalContent>
                <Formik
                    initialValues={{ name: '', description: '', selectedServices: [] as string[] }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            <ModalHeader>Create Service</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Box mb={4}>
                                    <Field
                                        as={Input}
                                        name="name"
                                        placeholder="Name"
                                        variant="outline"
                                        width="100%"
                                    />
                                    <Text color="red.500" fontSize="sm">
                                        <ErrorMessage name="name" />
                                    </Text>
                                </Box>

                                <Box mb={4}>
                                    <Field
                                        as={Textarea}
                                        name="description"
                                        placeholder="Description"
                                        variant="outline"
                                        width="100%"
                                    />
                                    <Text color="red.500" fontSize="sm">
                                        <ErrorMessage name="description" />
                                    </Text>
                                </Box>

                                <Box mb={4}>
                                    <Input
                                        placeholder="Search services"
                                        onChange={(e) => setModalFilter(e.target.value)}
                                        value={modalFilter}
                                    />
                                    <Box mt={2} maxHeight="150px" overflowY="auto">
                                        {modalFilter && filteredModalServices.map((service, index) => (
                                            <Text
                                                key={index}
                                                cursor="pointer"
                                                onClick={() => {
                                                    if (!values.selectedServices.includes(service)) {
                                                        setFieldValue(
                                                            'selectedServices',
                                                            [...values.selectedServices, service]
                                                        );
                                                    }
                                                    setModalFilter('')
                                                }}
                                                _hover={{ backgroundColor: "teal.100" }}
                                                p={1}
                                            >
                                                {service}
                                            </Text>
                                        ))}
                                    </Box>
                                </Box>

                                <Box>
                                    <Heading size="sm" mb={2}>Selected Services:</Heading>
                                    <UnorderedList>
                                        {values.selectedServices.map((service, index) => (
                                            <ListItem key={index}>{service}</ListItem>
                                        ))}
                                    </UnorderedList>
                                    <Text color="red.500" fontSize="sm">
                                        <ErrorMessage name="selectedServices" />
                                    </Text>
                                </Box>
                            </ModalBody>

                            <ModalFooter>
                                <Button mr={3} onClick={() => {
                                    setIsModalOpen(false)
                                    setModalFilter('')
                                }}>
                                    Cancel
                                </Button>
                                <Button colorScheme="teal" type="submit">
                                    Save
                                </Button>
                            </ModalFooter>
                        </Form>
                    )}
                </Formik>
            </ModalContent>
        </Modal >
    );
};
