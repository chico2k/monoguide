import { Client, ClientOptions } from '@elastic/elasticsearch';
import type { Client as NewTypes } from '@elastic/elasticsearch/api/new';

const node = process.env.ELASTIC_HOST || 'http://localhost:9200';

const config: ClientOptions = {
  node,
};

const esClient = new Client(config);

const esClientNewTypes = esClient as unknown as NewTypes;

export default esClientNewTypes;
