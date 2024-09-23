目录

# 【模型接入】谷歌 Gemini

## [#](#_1-gemini-接入现状) 1. Gemini 接入现状？

项目暂未完成对 Gemini 的接入，主要有两点原因：

① 虽然 Spring AI 的 [`spring-ai-vertex-ai-gemini` (opens new window)](https://github.com/spring-projects/spring-ai/tree/main/models/spring-ai-vertex-ai-gemini) 对 Gemini 的集成，但是它的 [API 认证方式 (opens new window)](https://cloud.google.com/docs/authentication/provide-credentials-adc?hl=zh-cn#local-dev) 很奇怪（和主流大模型 API 差异很大），没跑通，所以暂时放弃。

② Gemini 目前应该是不如 OpenAI（ChatGPT），所以优先级不高。

所以，等后续 Gemini 变强，并且流行度更高之后，我们再进行接入！

## [#](#_2-gemma-如何接入) 2. Gemma 如何接入？

Gemma 是 Gemini 的[开源版本 (opens new window)](https://github.com/google-deepmind/gemma)，可以进行私有化部署。

整个的接入，类似 [《【模型接入】LLAMA》](/ai/llama)。下面，我简单写下，有疑问可以星球提问哈！主要是，貌似也没听说哪个团队或者朋友在使用~

① 访问 [Ollama 官网 (opens new window)](https://ollama.ai/download)，下载对应系统 Ollama 客户端，然后安装。

② 安装完成后，在命令中执行 `ollama run gemma` 命令，一键部署 `gemma` 模型。

③ 之后，需要使用 Spring AI 的 [`spring-ai-ollama` (opens new window)](https://github.com/spring-projects/spring-ai/tree/main/models/spring-ai-ollama) 进行接入。

不知道它怎么使用的话，可以看看 [《Spring AI : Java Integration with Large Language Models Simplified》 (opens new window)](https://medium.com/@freeyecheng/spring-ai-java-integration-with-large-language-models-simplified-04873df6a538) 博客。