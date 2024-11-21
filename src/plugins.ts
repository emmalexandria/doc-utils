export class Transform<C, O> {
  plugins: PluginDefinition<O>[]
  config: C
  func: TransformFunc<C, O>
  root: Node

  constructor(func: TransformFunc<C, O>, config: C, root: Node) {
    this.plugins = []
    this.config = config
    this.func = func
    this.root = root
  }

  add<C>(plugin: Plugin<C, O>, config?: C) {
    this.plugins.push(plugin(config))
    return this
  }

  run() {
    const transformFunc = this.func(this.config)
    if (transformFunc) {
      const transformOutput = transformFunc(this.root)

      this.plugins.forEach((plugin) => {
        plugin(transformOutput)
      })
    }
  }
}

export type defineTransform<C, O> = (config: C, root: Node) => () => Transform<C, O>

export type TransformFunc<C, O> = (config: C) => ((root: Node, userConfig?: any) => O) | undefined


export type PluginDefinition<O> = (transformResult: O) => void

export type Plugin<C, O> = (config?: Partial<C>) => PluginDefinition<O>



