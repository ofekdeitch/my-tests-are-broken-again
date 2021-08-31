import React, { useContext } from 'react';
import { InstantService } from '../services/instant/glossary';

interface Context {
    instantService: InstantService
}

export const InstantContext = React.createContext<Partial<Context>>({});


interface Props {
    instantService: InstantService;
    children?: React.ReactNode
}

export const Providers: React.FC<Props> = ({ instantService, children }: Props) => {
    return (
        <InstantContext.Provider value={{ instantService }}>
            {children}
        </InstantContext.Provider>
    );
}

export function useInstantService(): InstantService {
    const { instantService } = useContext(InstantContext);
    return instantService!!;
}
