export const baptistLocators = {
    homepage: '(//div[@class="text-3xl font-extrabold p-4"])[1]',
    navigationBar: '.pi-bars',
    toolTip:'.shadow-tooltip span',
    chatBotIcon: '[aria-label="Open AI Assistant"]',
    backButton:'[alt="Go back"]',
    speakerButton:'[alt="Turn text to speech off"]',
    chatBotWindow:'div[class*="h-full"][class*="w-screen"]',
    welcomeMessage: '[class="text-sm ml-2.5 text-black/40"]',
    emergencyToastMessage: '.bg-alert-info-bg',
    micIcon:'[alt="Microphone off"]',
    infoIcon:'[alt="Info icon"]',
    overLay:'[class="bg-white w-full min-h-[35%] rounded-t-2.5xl flex flex-col"]',
};

export const loginLocators = {
    username: '#LoginId',
    password: '#password',
    submitButton:'[type="submit"]'
}