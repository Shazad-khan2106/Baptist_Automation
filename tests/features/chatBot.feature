Feature: Validating Chatbot Functionality
  Background: Login to Baptist
    Given I open the baptist login page
    When I enter "username" and "password"
    Then I should see the homepage

  Scenario: Chatbot Functionality check
    Given I open the baptist login page
    When I enter "username" and "password"
    Then I should see the homepage
    And I click on the chatbot
    And I click on the mic icon
    And I speak "Hey Luna, can you book an appointment for me with doctor?"
    Then I should see "Hey Luna, can you book an appointment for me with doctor?" in the input bar
