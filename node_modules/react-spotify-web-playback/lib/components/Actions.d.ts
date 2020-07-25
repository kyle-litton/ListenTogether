/// <reference types="react" />
import { IStylesOptions } from '../types/common';
import { ISpotifyDevice } from '../types/spotify';
interface IProps {
    currentDeviceId: string;
    devices: ISpotifyDevice[];
    isDevicesOpen: boolean;
    onClickDevice: (deviceId: string) => any;
    setVolume: (volume: number) => any;
    styles: IStylesOptions;
    volume: number;
}
declare const Actions: ({ currentDeviceId, devices, isDevicesOpen, onClickDevice, setVolume, styles, volume, }: IProps) => JSX.Element;
export default Actions;
