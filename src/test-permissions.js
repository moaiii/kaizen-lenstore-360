const permissionsNames = [
  'geolocation',
  'notifications',
  'push',
  'midi',
  'camera',
  'microphone',
  'speaker',
  'device-info',
  'background-fetch',
  'background-sync',
  'bluetooth',
  'persistent-storage',
  'ambient-light-sensor',
  'accelerometer',
  'gyroscope',
  'magnetometer',
  'clipboard',
  'display-capture',
  'nfc',
];

const getAllPermissions = async () => {
  const allPermissions = [];
  // We use Promise.all to wait until all the permission queries are resolved
  await Promise.all(
    permissionsNames.map(async (permissionName) => {
      try {
        let permission;
        switch (permissionName) {
          case 'push':
            // Not necessary but right now Chrome only supports push messages with  notifications
            permission = await navigator.permissions.query({
              name: permissionName,
              userVisibleOnly: true,
            });
            break;
          default:
            permission = await navigator.permissions.query({
              name: permissionName,
            });
        }
        allPermissions.push({ permissionName, state: permission.state });
      } catch (e) {
        allPermissions.push({
          permissionName,
          state: 'error',
          errorMessage: e.toString(),
        });
      }
    }),
  );
  return allPermissions;
};

export default async () => {
  const allPermissions = await getAllPermissions();
  return allPermissions
    .filter((el) => el.state === 'granted')
    .map((el) => `${el.permissionName} - ${el.state}`);
};
