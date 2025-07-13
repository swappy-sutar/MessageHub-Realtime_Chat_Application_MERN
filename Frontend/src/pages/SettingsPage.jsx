import React from "react";
import { useThemeStore } from "../store/useThemeStore.js";
import { Send } from "lucide-react";
import { THEMES } from "../constants/index.js";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! Good Morning...😊 ", isSent: true },
  { id: 2, content: "hello", isSent: false },
  { id: 3, content: "Nice to meet you", isSent: false },
  { id: 4, content: "How are you?", isSent: true },
  { id: 5, content: "I'm good, thanks!", isSent: false },
];

function SettingsPage() {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="lg:h-[100%] container mx-auto px-4 py-6 my-10">
      <div className="flex flex-col lg:flex-row gap-10 items-start justify-center">
        {/* Theme Selector */}
        <div className="w-full lg:w-3/5 ">
          <div className="flex flex-col gap-1 mb-4">
            <h2 className="text-lg font-semibold">Theme</h2>
            <p className="text-sm text-base-content/70">
              Choose a theme for your chat interface
            </p>
          </div>

          <div className="rounded-xl border border-base-300  bg-base-100 shadow-lg">
            <div className="p-4 bg-base-200">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 bg-base-100 p-2 rounded-lg">
                {THEMES.map((t) => (
                  <button
                    key={t}
                    className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}`}
                    onClick={() => setTheme(t)}
                  >
                    <div
                      className="relative h-8 w-full rounded-md overflow-hidden"
                      data-theme={t}
                    >
                      <div className="absolute inset-0 grid grid-cols-4 gap-[1px] p-1">
                        <div className="rounded bg-primary"></div>
                        <div className="rounded bg-secondary"></div>
                        <div className="rounded bg-accent"></div>
                        <div className="rounded bg-neutral"></div>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium truncate w-full text-center">
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="w-full lg:w-2/5">
          <div className="flex flex-col gap-1 mb-4">
            <h2 className="text-lg font-semibold">Preview</h2>
            <p className="text-sm text-base-content/70">
               See how your selected theme will look in the chat interface
            </p>
          </div>
          <div className="rounded-xl border border-base-300  bg-base-100 shadow-lg">
            <div className="p-4 bg-base-200">
              <div className="mx-auto">
                {/* Chat UI */}
                <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                  {/* Chat Header */}
                  <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                        J
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">John Doe</h3>
                        <p className="text-xs text-base-content/70">Online</p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-4 space-y-4 min-h-[350px] max-h-[200px] overflow-y-auto bg-base-100">
                    {PREVIEW_MESSAGES.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.isSent ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-xl p-2 shadow-sm ${
                            message.isSent
                              ? "bg-primary text-primary-content"
                              : "bg-base-200"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-[10px] mt-1.5 ${
                              message.isSent
                                ? "text-primary-content/70"
                                : "text-base-content/70"
                            }`}
                          >
                            12:00 PM
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t border-base-300 bg-base-100">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="input input-bordered flex-1 text-sm h-10"
                        placeholder="Type a message..."
                        value="This is a preview"
                        readOnly
                      />
                      <button className="btn btn-primary h-10 min-h-0">
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
