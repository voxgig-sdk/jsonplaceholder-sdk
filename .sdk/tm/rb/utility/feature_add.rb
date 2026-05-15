# Jsonplaceholder SDK utility: feature_add
module JsonplaceholderUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
