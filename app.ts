import * as config from 'config';

import {router} from './app/routes/user';
import {App} from "innots";

const app = new App(config, router);