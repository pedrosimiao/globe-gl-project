declare module "*.geojson" {
    const value: {type: string, features: any[]};
    export default value;
}