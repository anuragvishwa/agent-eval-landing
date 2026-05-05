import { motion } from 'framer-motion';

// AI Company Icons
const OpenAIIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
  </svg>
);

const AnthropicIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.827 3.52h3.603L24 20.48h-3.603l-6.57-16.96zm-7.258 0h3.767L16.906 20.48h-3.674l-1.343-3.461H5.017l-1.344 3.46H0l6.57-16.96zm1.96 5.252l-2.571 6.63h5.14l-2.57-6.63z"/>
  </svg>
);

const GoogleGeminiIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.372 0 0 5.372 0 12c0 6.627 5.372 12 12 12 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm5.082 16.427c-1.408 1.408-3.281 2.184-5.082 2.184-1.8 0-3.674-.776-5.082-2.184C5.51 15.019 4.734 13.145 4.734 11.345c0-1.8.776-3.674 2.184-5.082C8.326 4.855 10.2 4.079 12 4.079c1.8 0 3.674.776 5.082 2.184 1.408 1.408 2.184 3.282 2.184 5.082 0 1.8-.776 3.674-2.184 5.082z"/>
  </svg>
);

const DeepSeekIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.2-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.37.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
  </svg>
);

const MetaIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.915 4.03c-1.968 0-3.326 1.09-4.587 3.18C1.342 8.862.5 11.166.5 13.2c0 2.373 1.14 3.827 3.243 3.827 1.348 0 2.586-.656 3.926-2.074.487-.516.97-1.09 1.452-1.716l.352-.46c.148.396.297.79.448 1.167.535 1.33 1.2 2.21 2.295 2.763.494.25 1.04.375 1.617.375 1.482 0 2.832-.78 3.993-2.273C19.013 13.09 19.5 11.2 19.5 9.434c0-1.2-.292-2.197-.876-2.963-.564-.74-1.39-1.147-2.37-1.147-1.403 0-2.713.77-3.895 2.163-.582.685-1.13 1.49-1.648 2.41-.14-.386-.29-.77-.446-1.13-.608-1.392-1.336-2.326-2.432-2.88A3.99 3.99 0 0 0 6.915 4.03zM16.254 7.2c.49 0 .87.175 1.15.535.3.382.452.883.452 1.5 0 1.382-.398 2.952-1.202 4.41-.79 1.434-1.678 2.245-2.69 2.245-.377 0-.7-.1-.975-.3-.613-.445-1.108-1.297-1.583-2.46l-.134-.335c.58-1.203 1.176-2.244 1.795-3.098.827-1.14 1.68-1.748 2.51-1.92a1.79 1.79 0 0 1 .377-.04l.3-.037zM6.915 5.906c.358 0 .69.08.996.24.694.366 1.224 1.073 1.696 2.153.112.256.222.524.33.804l.092.245c-.621 1.028-1.204 1.9-1.758 2.607C7.38 13.1 6.47 13.77 5.56 13.97c-.12.027-.24.04-.36.04-.74 0-1.293-.353-1.617-.965-.212-.398-.32-.89-.32-1.438 0-1.678.73-3.6 1.84-5.07.67-.886 1.33-1.41 1.98-1.543a1.5 1.5 0 0 1 .318-.034l.14-.018.375-.036z"/>
  </svg>
);

const MistralIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3h3v3H3zm15 0h3v3h-3zM3 8h3v3H3zm5 0h3v3H8zm5 0h3v3h-3zm5 0h3v3h-3zM3 13h3v3H3zm5 0h3v3H8zm5 0h3v3h-3zm5 0h3v3h-3zM3 18h3v3H3zm15 0h3v3h-3z"/>
  </svg>
);

const CohereIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.55 12.65c2.67 0 5.26-.88 7.39-2.51a2.34 2.34 0 0 0 .9-1.83c0-.69-.31-1.34-.84-1.78A12.72 12.72 0 0 0 8.2 4.08c-3.73 0-6.86 1.63-6.86 5.08 0 2.75 2.9 3.49 7.21 3.49zm6.37 1.7a13.85 13.85 0 0 1-7.56 2.22c-1.71 0-3.37-.21-4.76-.78a3.48 3.48 0 0 0-.3 1.42c0 2.56 2.46 4.42 6.28 4.42 3.08 0 6.48-1.74 8.12-4.32.56-.88.86-1.76.86-2.52 0-.91-.57-1.56-1.49-1.56-.42 0-.82.13-1.15.37v-.25z"/>
  </svg>
);

const GroqIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 17a7 7 0 1 1 7-7 7 7 0 0 1-7 7zm0-11.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm0 7A2.5 2.5 0 1 1 14.5 12 2.5 2.5 0 0 1 12 14.5z"/>
  </svg>
);

const PerplexityIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1L4 5v6.5L12 16l8-4.5V5L12 1zm0 2.31l5.74 3.22L12 9.75 6.26 6.53 12 3.31zM5.5 7.58l5.75 3.22v6.44L5.5 14.02V7.58zm7.25 9.66V10.8l5.75-3.22v6.44l-5.75 3.22zM12 18l-3.5-1.97V19L12 21.5 15.5 19v-2.97L12 18z"/>
  </svg>
);

const HuggingFaceIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.5 5.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm5 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM8.5 14.5c0-2 1.5-3 3.5-3s3.5 1 3.5 3c0 1.5-1.5 3-3.5 3s-3.5-1.5-3.5-3z"/>
  </svg>
);

const ReplicateIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2 5h7v2H4v10h5v2H2V5zm13 0h7v14h-7v-2h5V7h-5V5zm-5.5 3h5v2h-5V8zm0 3h5v2h-5v-2zm0 3h5v2h-5v-2z"/>
  </svg>
);

const TogetherAIIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L4 6v4l8-4 8 4V6l-8-4zm-8 6v4l8 4 8-4v-4l-8 4-8-4zm0 6v4l8 4 8-4v-4l-8 4-8-4z"/>
  </svg>
);

const integrations = [
  { name: 'OpenAI', color: '#412991', Icon: OpenAIIcon },
  { name: 'Anthropic', color: '#D4A574', Icon: AnthropicIcon },
  { name: 'Google Gemini', color: '#4285F4', Icon: GoogleGeminiIcon },
  { name: 'DeepSeek', color: '#4D6BFE', Icon: DeepSeekIcon },
  { name: 'Meta AI', color: '#0668E1', Icon: MetaIcon },
  { name: 'Mistral', color: '#F7D046', Icon: MistralIcon },
  { name: 'Cohere', color: '#39594D', Icon: CohereIcon },
  { name: 'Groq', color: '#F55036', Icon: GroqIcon },
  { name: 'Perplexity', color: '#1FB8CD', Icon: PerplexityIcon },
  { name: 'Hugging Face', color: '#FFD21E', Icon: HuggingFaceIcon },
  { name: 'Replicate', color: '#3D3D3D', Icon: ReplicateIcon },
  { name: 'Together AI', color: '#6366F1', Icon: TogetherAIIcon },
];

export function Integrations() {
  return (
    <section id="integrations" className="py-24 bg-background/80">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-secondary mb-4 block">
            Integrations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-4">
            Works with every AI provider
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Monitor and debug agents powered by any model provider. Plug in your stack and get instant observability.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-6"
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ scale: 1.1, y: -4 }}
              className="group flex flex-col items-center justify-center p-4 bg-canvas border border-border rounded-xl hover:border-border-hover hover:shadow-lg transition-all cursor-pointer"
            >
              <div
                className="mb-2 transition-transform group-hover:scale-110"
                style={{ color: integration.color }}
              >
                <integration.Icon />
              </div>
              <span className="text-[10px] md:text-xs font-mono text-muted group-hover:text-foreground transition-colors text-center">
                {integration.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
