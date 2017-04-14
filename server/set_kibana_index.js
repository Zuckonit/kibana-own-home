export default function (server, request, remoteUser, suffix) {
  const defaultIndex = server.config().get('own_home.default_kibana_index_suffix');
  const prefix = server.config().get('kibana.index');
  let idx = [prefix];
  if (suffix) {
    idx.push(suffix);
  }

  let value = idx.join('_');
  const remoteUserSession = request.yar.get(remoteUser) || {};
  const requestKbnIndex = remoteUserSession.key;
  value = requestKbnIndex ? value : `${prefix}_${defaultIndex}`;
  request.yar.set(remoteUser, {key: value});
};
