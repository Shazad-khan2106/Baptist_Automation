Feature: Validating Baptist Static Flow to Chatbot
  Background: Login to Baptist
    Given I open the baptist login page
    When I enter "username" and "password"
    Then I should see the homepage

  Scenario: Mobile View Static Flow to Chatbot
    Given I am on the navigation bar
    When I click on the "Get Care" option in the navigation bar
    And I select the "Schedule Appointment" option
    And I click on the "Primary Care" card
    Then I should see the chatbot with a tooltip
    When I click on the chatbot icon
    Then The chatbot window should open
    And I should see a toast message for emergency
    And I should see a welcome message from the chat assistant
    And I should see the speaker and back buttons at the top
    And I should see an input field with a disabled mic icon
    When I click on the information (i) button
    Then an overlay should appear with a message and a "Got It" button
  
    