import Head from '../components/head';
import { InitializedProvider } from '../contexts/contextcontroller';
import Buttoneer from '../components/buttoneer';
import NestingDoll from '../components/nestingdoll';
import ListView from '../components/listview';

export default () => (
  <div>
    <Head title="Home" />
    <InitializedProvider>
      <Buttoneer />
      <NestingDoll>
        <NestingDoll>
          <NestingDoll>
            <ListView />
          </NestingDoll>
        </NestingDoll>
      </NestingDoll>
    </InitializedProvider>
  </div>
);
