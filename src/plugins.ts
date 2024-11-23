import { ConfigDefault } from "./config.js"

export class Transform<C, O> {
  plugins: PluginDefinition<O>[]
  config: ConfigDefault<C>
  func: TransformFunc<C, O>
  root: Element | undefined

  constructor(func: TransformFunc<C, O>, config: ConfigDefault<C>, root?: Element) {
    this.plugins = []
    this.config = config
    this.func = func
  }

  add<C>(plugin: Plugin<C, O>, userConfig?: Partial<C>) {
    this.plugins.push(plugin(userConfig))
  }
  setplugins(plugins: PluginDefinition<O>[]) {
    this.plugins = plugins
  };
  run() {
    const transformFunc = this.func(this.config.get())
    if (transformFunc) {
      const transformOutput = transformFunc()

      this.plugins.forEach((plugin) => {
        plugin(transformOutput)
      })
    }
  }
}

export interface defineTransform<C, O> {
  config: ConfigDefault<C>;
  root?: Element;
  transformFunc: TransformFunc<C, O>;
  get(userConfig?: Partial<C>): Transform<C, O>
}

export type TransformDefinition<C, O> = (userConfig?: Partial<C>) => Transform<C, O>

export type TransformFunc<C, O> = (config: C) => ((userConfig?: any) => O) | undefined

export type PluginDefinition<O> = (transformResult: O) => void

export type Plugin<C, O> = (config?: Partial<C>) => PluginDefinition<O>



