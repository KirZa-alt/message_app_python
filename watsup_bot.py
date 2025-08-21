import webbrowser
import time
import pyautogui
import streamlit as st

page_bg = """
<style>
[data-testid="stAppViewContainer"] {
    background-image: url("https://thumbs.dreamstime.com/b/whatsapp-app-logo-under-magnifying-glass-circuit-board-background-search-find-function-messaging-computer-social-media-tech-385669865.jpg");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}
[data-testid="stHeader"] {
    background: rgba(0,0,0,0); /* transparent header */
}
</style>
"""
st.markdown(page_bg, unsafe_allow_html=True)
st.title("Whatsapp Message Sending App")
number = st.text_input(
    "Enter Number", 
    placeholder="e.g. 923160259225"
)

message = st.text_input(
    "Enter message", 
    placeholder="Type your WhatsApp message here..."
)

delay = st.number_input(
    "Enter time duration before sending (seconds)", 
    min_value=5, 
    value=10
)

if st.button("Send Message"):
    if number and message:
        # Open WhatsApp Web with pre-filled message
        webbrowser.open(f"https://web.whatsapp.com/send?phone={number}&text={message}")

        # Wait for the page to load
        time.sleep(delay)

        # Auto press Enter to send
        pyautogui.press("enter")

        st.success("Message sent successfully! ✅")
    else:
        st.error("Please enter both number and message.")
