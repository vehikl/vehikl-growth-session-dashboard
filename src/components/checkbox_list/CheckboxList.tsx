import React from 'react';
import {Box, VStack} from "@chakra-ui/react";

interface ICheckboxListProps {
    nodes: any,
    multipleNodeIdsToFilterBy: any,
    setMultipleNodeIdsToFilterBy: any,
}

const CheckboxList: React.FC<ICheckboxListProps> = ({nodes, multipleNodeIdsToFilterBy, setMultipleNodeIdsToFilterBy}) => {

    function generateCheckBoxes() {
        return nodes
            .map((node: any, key: number) =>
                <Box as='label' key={`box-${key}`}>
                    <input type="checkbox" id={node.id}
                           name="multiple_node_filter"
                           key={`checkbox-${key}`}
                           onChange={() => {
                               if (multipleNodeIdsToFilterBy.includes(node.id)) {
                                   setMultipleNodeIdsToFilterBy([...multipleNodeIdsToFilterBy].filter((nodeId) => nodeId !== node.id));
                               } else {
                                   setMultipleNodeIdsToFilterBy([...multipleNodeIdsToFilterBy, node.id])
                               }
                           }}
                           checked={isCheckboxChecked(node.id)} hidden/>
                    <Box
                        cursor='pointer'
                        borderWidth='1px'
                        borderRadius='md'
                        boxShadow='md'
                        bg={isCheckboxChecked(node.id) ? 'red.600' : ''}
                        px={5}
                        py={3}
                    >
                        {node.name}
                    </Box>
                </Box>)
    }

    const isCheckboxChecked = (nodeId: number) => {
        if (multipleNodeIdsToFilterBy.includes(nodeId)) {
            return true;
        }
        return false;
    }

    return (
        <>
            <VStack>
                {generateCheckBoxes()}
            </VStack>
        </>
    );
}

export default CheckboxList;