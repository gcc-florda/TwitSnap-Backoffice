import { Box, Input } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
    onFilterChange: (value: string) => void;
}

export const Filter = ({ onFilterChange }: Props) => {
    const [filter, setFilter] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFilter(value);
        onFilterChange(value);
    };

    return (
        <Box mb={4}>
            <Input
                placeholder="Name"
                value={filter}
                onChange={handleChange}
                focusBorderColor="teal.500"
                width={'25%'}
            />
        </Box>
    );
};
