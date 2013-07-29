//
//  ctdProfileViewController.m
//  ConnectToDoor
//
//  Created by muhammad amirul on 7/11/13.
//  Copyright (c) 2013 Photon Infotech. All rights reserved.
//

#import "ctdProfileViewController.h"
#import "ctdLocalStorage.h"
#import "ctdConstants.h"
#import "ctdVoucherViewController.h"


@implementation ctdProfileViewController

NSString *employeeId;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        self.hasBackButton = NO;
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
   
}

// Displays the user's name and profile picture so they are aware of the Facebook
// identity they are logged in as.
- (void)populateUserDetails {
    ctdLocalStorage *localStorage = [[ctdLocalStorage alloc]init];
    
    
    employeeId = localStorage.getEmployeeId;
    self.userProfileImage.profileID = localStorage.getUserFacebookId;
    
    ctdProfileService *profileService = [[ctdProfileService alloc] init];
    [profileService handleProfileRequest:EMPLOYEE_ID_PARAMETER :employeeId];
    profileService.delegate = self;
}

- (void)didReceiveProfileResponse:(ctdProfileModel*)profileModel
{
    self.userNameLabel.text = profileModel.employeeName;
    self.employeeIdLabel.text = profileModel.employeeId;
    self.employeeEmailPhotonLabel.text = profileModel.employeeEmailPhoton;
    self.employeeStartWorkLabel.text = profileModel.employeeStartWork;
    self.authorityLabel.text = profileModel.authority;
    self.projectIdLabel.text = profileModel.projectId;
   
    self.marriedLabel.text = [NSString stringWithFormat:@"%@ days", profileModel.married];
    self.condolencesLabel.text = [NSString stringWithFormat:@"%@ days", profileModel.condolences];
    self.maternityLabel.text = [NSString stringWithFormat:@"%@ days", profileModel.maternity];
    self.cOffLabel.text = [NSString stringWithFormat:@"%@ days", profileModel.cOff];
    self.annualLabel.text = [NSString stringWithFormat:@"%@ days", profileModel.annual];
    self.onsiteLabel.text = [NSString stringWithFormat:@"%@ days", profileModel.onsite];
    self.paternityLabel.text = [NSString stringWithFormat:@"%@ days", profileModel.paternity];
    self.sickLabel.text = [NSString stringWithFormat:@"%@ days", profileModel.sick];
}

- (void)didReceiveProfileErrorResponse:(NSError*)error
{
    NSLog(@"ERROR RESPONSE : %@", error);
}

-(void)viewWillAppear:(BOOL)animated{
    [self populateUserDetails];
}

- (IBAction)backToWelcomePage:(id)sender{
    [self goToWelcomePage];
}

- (IBAction)didClickVoucher:(id)sender{
    [self goToVoucher];
}

-(void)goToWelcomePage{
    [self.navigationController popViewControllerAnimated:YES];
}

-(void) goToVoucher{
    ctdVoucherViewController *voucherViewController = [[ctdVoucherViewController alloc]initWithNibName:@"ctdVoucherViewController" bundle:nil];
    [self.navigationController pushViewController:voucherViewController animated:YES];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    [FBProfilePictureView class];
    return YES;
}

@end
