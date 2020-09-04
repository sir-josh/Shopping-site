import { createContext } from "react";

import DIRECTORY_DATA from './directory.data';

const DirectoryDataContext = createContext(DIRECTORY_DATA);

export default DirectoryDataContext;