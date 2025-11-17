import jetEnv, { num, str, bool} from 'jet-env';
import { isEnumVal } from 'jet-validators';

import { NodeEnvs } from '.';

const ENV = jetEnv({
  NodeEnv: isEnumVal(NodeEnvs),
  Port: num,
  Host: str,
  DisableHelmet: bool || undefined,
  MediarouteBaseUrl: str,
  ThumbnailrouteBaseUrl: str,
  CorsOrigin: str,
});

export default ENV;
