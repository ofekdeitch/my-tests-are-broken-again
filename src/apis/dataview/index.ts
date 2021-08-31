import axios from 'axios';
import { MessageModel } from '../../models/message';
import { URLs } from '../urls';
import { DataViewContract, toDataViewResult } from './contracts/dataview';

export class DataViewApi {

    static async get(): Promise<MessageModel[]> {
        const result = await axios.get<DataViewContract>(URLs.getDataView());
        return toDataViewResult(result.data);
    }

}
