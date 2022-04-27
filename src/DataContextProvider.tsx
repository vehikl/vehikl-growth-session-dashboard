import React, {useEffect, useState} from 'react';
import {DataContextType} from "./types/Types";
import axios from "axios";

export const DataContext = React.createContext<DataContextType>({} as DataContextType);

const DataContextProvider: React.FC = ({children}) => {

    const [data, setData] = useState<any>({});

    useEffect(() => {
        let unmounted = false;

        const getDataFromApi = async () => {
            const [
                nodes,
                edges,
                nodeDictionary,
                edgeDictionary,
                connections,
            ] = await Promise.all([
                axios.get('http://localhost:8000/nodes'),
                axios.get('http://localhost:8000/edges'),
                axios.get('http://localhost:8000/dictionary/nodes'),
                axios.get('http://localhost:8000/dictionary/edges'),
                axios.get('http://localhost:8000/dictionary/connections'),
            ]);

            if (!unmounted) setData({
                nodes: nodes.data,
                edges: edges.data,
                nodeDictionary: nodeDictionary.data,
                edgeDictionary: edgeDictionary.data,
                connections: connections.data
            })
        }

        getDataFromApi();

        return () => {
            unmounted = true;
        }
    }, []);

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContextProvider;